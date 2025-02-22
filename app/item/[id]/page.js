import StarRating from '../../modules/StarRating';

export default function ItemPage({ params }) {
  const { id } = params;
  console.log('params:', params); // Sprawdź, co zawiera params
  return (
    <div>
      <p>oceń aplikację</p>
      <StarRating itemId={id} />
    </div>
  );
}

