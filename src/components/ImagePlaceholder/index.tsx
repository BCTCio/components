import classNames from 'classnames';
import React, { FC, useEffect, useState } from 'react';
import { Spinner } from '../Spinner';

export interface ImagePlaceholderProps {
  src?: string | null;
  backupImage: 'avatar' | 'image' | string;
  className?: string;
  imageElement?: FC<any>;
  extraImageProps?: any;
}

enum Status {
  LOADING,
  ERROR,
  SUCCESS,
}

/** If backupImage is 'avatar' or 'image', src is assumed to be `'/misc/emptyAvatar.svg'` and `'/misc/emptyImage.png'` respectively */
export const ImagePlaceholder: FC<ImagePlaceholderProps> = ({
  src,
  backupImage,
  className,
  imageElement,
  extraImageProps = {},
}) => {
  const [status, setStatus] = useState<Status>(Status.LOADING);
  const [showImage, setShowImage] = useState(false);
  let image = src;
  if (status === Status.ERROR || !image) {
    switch (backupImage) {
      case 'avatar':
        image = '/misc/emptyAvatar.svg';
        break;
      case 'image':
        image = '/misc/emptyImage.png';
        break;
      default:
        image = backupImage;
        break;
    }
  }
  const ImageElement = imageElement;
  useEffect(() => {
    setShowImage(true);
  }, []);

  const props = {
    src: image,
    className: classNames(
      {
        'rounded-full': backupImage === 'avatar',
        'opacity-0': status === Status.LOADING,
      },
      'transition-opacity duration-300 w-full h-full'
    ),
    onError: () => setStatus(Status.ERROR),
    onLoad: () => status === Status.LOADING && setStatus(Status.SUCCESS),
    layout: 'fill',
    alt: '',
    ...extraImageProps,
  };

  return (
    <div className={'relative ' + className}>
      {showImage && (
        <div className="absolute w-full h-full">
          {ImageElement ? <ImageElement {...props} /> : <img {...props} />}
        </div>
      )}
      <Spinner
        className={classNames(
          className,
          'border-none transition-opacity duration-300',
          {
            'opacity-0': status !== Status.LOADING,
          }
        )}
      />
    </div>
  );
};
