import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // 1. Create a Route
  const route = await prisma.route.create({
    data: {
      name: "Campus Loop A",
      waypoints: JSON.stringify([
        [34.0522, -118.2437],
        [34.0550, -118.2437],
        [34.0550, -118.2400],
        [34.0522, -118.2400]
      ])
    }
  });

  // 2. Create Stops
  const stops = [
    { name: "Central Library", lat: 34.0522, lng: -118.2437, sequence: 1 },
    { name: "Science Plaza", lat: 34.0550, lng: -118.2437, sequence: 2 },
    { name: "Student Union", lat: 34.0550, lng: -118.2400, sequence: 3 },
    { name: "Engineering Block", lat: 34.0522, lng: -118.2400, sequence: 4 },
  ];

  for (const stop of stops) {
    await prisma.stop.create({
      data: {
        name: stop.name,
        lat: stop.lat,
        lng: stop.lng,
        sequence: stop.sequence,
        route_id: route.id
      },
    });
  }

  // 3. Create a Bus for the route
  await prisma.bus.create({
    data: {
      id: "677f5a54-406a-4d24-8186-0a2b84920478", // Specific ID for bus_01 mock
      plate: "IZUM-001",
      route_id: route.id
    }
  });

  console.log("Seeded route, stops, and bus successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    // process.exit(1); // Removed to avoid @types/node error if not installed
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
