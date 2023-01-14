import Image from "next/image";

export default function BluesBrothers() {
  return (
    <div>
      <h1>Blues Brothers</h1>
      <Image
        width={400}
        height={400}
        alt="Blues Brothers"
        src="/images/blues-brothers.jpg"
      />
    </div>
  );
}
