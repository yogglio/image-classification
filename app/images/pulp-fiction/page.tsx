import Image from "next/image";

export default function PulpFiction() {
  return (
    <>
      <h1 className="text-2xl font-bold">Pulp Fiction</h1>
      <Image
        width={400}
        height={400}
        alt="Pulp Fiction"
        src="/images/pulp-fiction.jpg"
      />
    </>
  );
}
