export default function RemoveBodyScroll() {
  return (
    <style jsx global>
      {`
        body {
          overflow: hidden;
        }
      `}
    </style>
  );
}
