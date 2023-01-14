import Image from "next/image";

export default function PulpFiction() {
  return (
    <div>
      <h1>Pulp Fiction</h1>
      <Image
        width={400}
        height={400}
        alt="Pulp Fiction"
        src="/images/pulp-fiction.webp"
      />
    </div>
  );
}
