export default function Player({ src }) {
    return (
      <video
        controls
        className="w-full rounded-lg"
        src={src}
      />
    );
  }
  