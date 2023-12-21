import React, { Component } from 'react';
import fetchImages from './API/PixabayAPI';
import Loader from './Loader/Loader';
import Searchbar from 'components/Searchbar/Searchbar';
import ImageGalleryItems from './ImageGalleryItem/ImageGalleryItem';
import Button from './Button/Buttom';
import Modal from './Modal/Modal';

class App extends Component {
  state = {
    itemImg: [],
    currentPage: 1,
    searchNameImg: '',
    isLoading: false,
    showModal: false,
    imgData: '',
  };

  async componentDidUpdate(prevProps, prevState) {
    const { searchNameImg, currentPage, isLoading } = this.state;

    if (isLoading && prevState.currentPage !== currentPage) {
      try {
        const getImages = await fetchImages(searchNameImg, currentPage);

        this.setState(prevState => ({
          itemImg: [...prevState.itemImg, ...getImages.hits],
          isLoading: false, // Устанавливаем isLoading в false после успешной загрузки
        }));
      } catch (error) {
        console.log(error);
      }
    }
    console.log('componetDidUpdate');
  }

  addStateImg = async searchName => {
    try {
      if (searchName === '') {
        alert('пустая строка');
      } else if (this.state.searchNameImg === searchName) {
        alert('уже был такой запрос');
      } else {
        this.setState({ isLoading: true, currentPage: 1 }); // Сброс currentPage перед новым поиском
        const getImages = await fetchImages(searchName);

        this.setState(() => ({
          itemImg: [...getImages.hits],
          searchNameImg: searchName,
          isLoading: false,
        }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  toggaleModal = e => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));

    this.getImgDate(e);
  };

  getImgDate = data => {
    this.setState(() => ({
      imgData: data,
    }));
  };

  loadMore = async () => {
    this.setState(prevState => ({
      currentPage: prevState.currentPage + 1,
      isLoading: true, // Устанавливаем isLoading в true перед загрузкой следующей страницы
    }));
  };

  render() {
    const { isLoading, itemImg, imgData, showModal } = this.state;

    return (
      <>
        <Searchbar addStateImg={this.addStateImg} />
        {showModal && <Modal imgData={imgData} onClose={this.toggaleModal} />}
        <ImageGalleryItems
          onOpenModalImg={this.toggaleModal}
          queryImg={itemImg}
        />
        {isLoading && <Loader />}
        {itemImg.length > 0 && (
          <Button loadMore={this.loadMore} isLoading={isLoading} />
        )}
      </>
    );
  }
}

export default App;
