interface CarDetailsProps {
  params: Promise<{ id: string }>;
}

const CarDetails = async ({ params }: CarDetailsProps) => {
  const { id } = await params;

  return (
    <div>
      <h1>Car Details</h1>
      <p>Car ID: {id}</p>
    </div>
  );
};

export default CarDetails;
