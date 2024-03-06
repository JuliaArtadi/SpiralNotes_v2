import Image from "next/image";

export default function AcmeLogo() {
  return (
    <div className={`flex flex-row items-center leading-none text-black`}>
      <Image
        src="/S-letter.png"
        width={500}
        height={500}
        // className="hidden md:block"
        alt="S"
      />
      <p className="text-[44px]">piral Notes</p>
    </div>
  );
}
