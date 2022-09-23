import { FileInput, FileInputProps } from '../FileInput';
import classNames from 'classnames';
import React, { FC, useState } from 'react';
import { error } from '../Notification';
import type Compressor from 'compressorjs';
import { formatFileSize } from '../Formatting';
import { Modal } from '../Modal';

export interface ImageInputProps extends Omit<FileInputProps, 'onChange' | 'icon' | 'multiple'> {
  onChange: (file: File | null) => any;
  dimensions?: 'round' | { width: number; height: number };
}

const compressJpgPng = (file: File, options?: Compressor.Options): Promise<File> =>
  new Promise(
    async (res, rej) =>
      new ((await import('compressorjs')).default)(file, {
        ...options,
        strict: false,
        resize: 'cover',
        success: res as (file: File) => void,
        error: rej,
      })
  );
  
const compressGif = async (file: File, size?: {width: number, height: number}): Promise<File> => {
  // @ts-ignore
  const gifsicle = (await import('gifsicle-wasm-browser')).default;
  const url = URL.createObjectURL(file);
  const result = await gifsicle.run({
    input: [{
      file: url,
      name: '1.gif',
    }],
    command: [`${size ? '--resize-touch ' + (`${size.width}x${size.height}`) : ''} --lossy=500 -O3 1.gif -o /out/out.gif`],});
  URL.revokeObjectURL(url);
  return result[0];
};

export const ImageInput: FC<ImageInputProps> = props => {
  const [fileURL, setFileURL] = useState('');
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <FileInput
        {...props}
        maxSize={undefined}
        onChange={async (file: File) => {
          if (
            file
          ) {
            let newFile = file;
            if (
              (file.type === 'image/png' || file.type === 'image/jpeg')) {
            newFile = await compressJpgPng(
              file,
              props.dimensions === 'round'
                ? {
                    width: 512,
                    height: 512,
                  }
                : props.dimensions
            );}
            if (file.type === 'image/gif') {
              newFile = await compressGif(file, props.dimensions === 'round' ? {width: 512, height: 512} : props.dimensions);
            }
            if (newFile.size < file.size) file = newFile;
          }
          if (props.maxSize && file && file.size > props.maxSize) {
            return error(
              `This image is too large. The maximum size is ${formatFileSize(props.maxSize)}`
            );
          }
          if (fileURL) {
            URL.revokeObjectURL(fileURL);
          }
          setFileURL(file ? URL.createObjectURL(file) : '');
          props.onChange(file);
        }}
        icon={
          fileURL ? (
            () => <img
              src={fileURL}
              alt="Avatar"
              className={classNames('w-6 h-6 rounded-full')}
            />
          ) : undefined
        }
      />
      {fileURL && (
        <p
          className="text-blue-500 text-sm cursor-pointer mt-1"
          onClick={() =>
            setShowModal(true)
          }
        >
          Click to view
        </p>
      )}
      <Modal show={showModal} setShow={setShowModal} title='View Uploaded Image'><img src={fileURL} alt="Image" className="w-full" /></Modal>
    </div>
  );
};

export default ImageInput;
