import Image from "next/image";

const Icon = () => {
  return (
    <div className="w-full h-20 flex items-center justify-center ">

    <div id="image__content">
      <Image className="w-10 h-10" width={100} height={100} quality={100} src="./logo.svg" alt="" />
    </div>
    </div>
  );
};

export default Icon;
