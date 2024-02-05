import Image from 'next/image';

const ImgComponent = () => {
    return(
        <Image 
        src="/imgs/test02.png"
        height={144}
        width={144}
        alt="img test"
        />
    );
}

export default ImgComponent;