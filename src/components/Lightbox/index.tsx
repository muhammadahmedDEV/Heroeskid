import React, { Component } from 'react'
import Lightbox from 'react-image-lightbox'
import 'react-image-lightbox/style.css'

type State = {
  photoIndex: number,
  isOpen: boolean
}
type Props = {
  photoList: any[],
  isOpenLightbox: boolean
  setValOpenLightBox: (a: boolean) => void
}
export default class LightboxExample extends Component<Props, State> {

  state = {
    photoIndex: 0,
    isOpen: false
  }
  triggerChangeOn = (): void => {
    const { isOpenLightbox, setValOpenLightBox } = this.props
    setValOpenLightBox(!isOpenLightbox)
  }
  changeIndexDown = (): void => {
    const { photoIndex } = this.state
    const { photoList } = this.props
    this.setState({
      photoIndex: (photoIndex + photoList.length - 1) % photoList.length
    })
  }
  changeIndexUp = (): void => {
    const { photoIndex } = this.state
    const { photoList } = this.props
    this.setState({
      photoIndex: (photoIndex + 1) % photoList.length
    })
  }
  render() {
    const { photoIndex } = this.state
    const { photoList, isOpenLightbox } = this.props
    return (
      <div>
        {isOpenLightbox && (
          <Lightbox
            mainSrc={photoList[photoIndex]}
            nextSrc={photoList[(photoIndex + 1) % photoList.length]}
            prevSrc={photoList[(photoIndex + photoList.length - 1) % photoList.length]}
            onCloseRequest={this.triggerChangeOn}
            onMovePrevRequest={this.changeIndexDown}
            onMoveNextRequest={this.changeIndexUp}
          />
        )}
      </div>
    )
  }
}
