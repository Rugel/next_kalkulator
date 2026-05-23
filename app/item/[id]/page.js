import StarRating from '../../modules/StarRating';

export const metadata = {
  title: "Oceń aplikację | Stawka Godzinowa",
  description: "Oceń naszą aplikację do obliczania wynagrodzeń i stawek godzinowych.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function ItemPage({ params }) {
  const { id } = params;
  return (
    <div>
      <h1>Oceń aplikację</h1>
      <StarRating itemId={id} />
    </div>
  );
}

