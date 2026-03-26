import 'dotenv/config' 

import { PrismaClient } from "@prisma/client";
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });




const main = async () => {
    await prisma.watchlistItem.deleteMany()
    await prisma.user.deleteMany()
    const userId = "9ae3a0cf-e1e7-4b11-a06e-fc1e0ca89347";
    await prisma.user.create({
        data: {
            id: userId,
            name: "Test User",
            email: "[EMAIL_ADDRESS]",
            password: await bcrypt.hash("password123", 10)
        }
    })
    
    console.log("Seeding completed!")
}

// const movies = [
//   {
//     title: "The Matrix",
//     overview: "A computer hacker learns from underground freedom fighters that the reality he lives in is a computer simulation and joins the rebellion against its machine controllers.",
//     releaseYear: 1999,
//     genres: ["Action", "Sci-Fi"],
//     runtime: 136,
//     posterurl: "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
//     trailerUrl: "https://www.youtube.com/embed/vKQi3bBA1y8",
//     createdBy: userId,
//   },
//   {
//     title: "Inception",
//     overview: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
//     releaseYear: 2010,
//     genres: ["Action", "Sci-Fi", "Thriller"],
//     runtime: 148,
//     posterurl: "https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg",
//     trailerUrl: "https://www.youtube.com/embed/YoHD9XEInc0",
//     createdBy: userId,
//   },
//   {
//     title: "The Dark Knight",
//     overview: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
//     releaseYear: 2008,
//     genres: ["Action", "Crime", "Drama"],
//     runtime: 152,
//     posterurl: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
//     trailerUrl: "https://www.youtube.com/embed/EXeTwQWrcwY",
//     createdBy: userId,
//   },
//   {
//     title: "Pulp Fiction",
//     overview: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
//     releaseYear: 1994,
//     genres: ["Crime", "Drama"],
//     runtime: 154,
//     posterurl: "https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
//     trailerUrl: "https://www.youtube.com/embed/s7EdQ4FqbhY",
//     createdBy: userId,
//   },
//   {
//     title: "Interstellar",
//     overview: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
//     releaseYear: 2014,
//     genres: ["Adventure", "Drama", "Sci-Fi"],
//     runtime: 169,
//     posterurl: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
//     trailerUrl: "https://www.youtube.com/embed/zSWdZVtXT7E",
//     createdBy: userId,
//   },
//   {
//     title: "The Shawshank Redemption",
//     overview: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
//     releaseYear: 1994,
//     genres: ["Drama"],
//     runtime: 142,
//     posterurl: "https://image.tmdb.org/t/p/w500/lyQBXzOQSuE59IsHyhrp0qIiPAz.jpg",
//     trailerUrl: "https://www.youtube.com/embed/6hB3S9bIaco",
//     createdBy: userId,
//   },
//   {
//     title: "Fight Club",
//     overview: "An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into something much, much more.",
//     releaseYear: 1999,
//     genres: ["Drama", "Thriller"],
//     runtime: 139,
//     posterurl: "https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
//     trailerUrl: "https://www.youtube.com/embed/qtRKdVHc-cE",
//     createdBy: userId,
//   },
//   {
//     title: "Forrest Gump",
//     overview: "The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an extraordinary story.",
//     releaseYear: 1994,
//     genres: ["Drama", "Romance"],
//     runtime: 142,
//     posterurl: "https://image.tmdb.org/t/p/w500/saHP97rTPS5eLmrLQEcANmKrsFl.jpg",
//     trailerUrl: "https://www.youtube.com/embed/bLvqoHBptjg",
//     createdBy: userId,
//   },
//   {
//     title: "The Godfather",
//     overview: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
//     releaseYear: 1972,
//     genres: ["Crime", "Drama"],
//     runtime: 175,
//     posterurl: "https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsLLeHCyOHKaE.jpg",
//     trailerUrl: "https://www.youtube.com/embed/sY1S34973zA",
//     createdBy: userId,
//   },
//   {
//     title: "Goodfellas",
//     overview: "The story of Henry Hill and his life in the mob, covering his relationship with his wife Karen Hill and his mob partners Jimmy Conway and Tommy DeVito.",
//     releaseYear: 1990,
//     genres: ["Biography", "Crime", "Drama"],
//     runtime: 146,
//     posterurl: "https://image.tmdb.org/t/p/w500/aKuFiU82s5ISJpGZp7YkIr3kCUd.jpg",
//     trailerUrl: "https://www.youtube.com/embed/qo0oFLTgmkU",
//     createdBy: userId,
//   },
// ];
// const main = async () => {
//   console.log("Seeding movies...");

//   // delete in correct order — children before parents
//   await prisma.watchlistItem.deleteMany();
//   await prisma.movie.deleteMany();
//   console.log("Cleared existing data");

//   for (const movie of movies) {
//     await prisma.movie.create({
//       data: movie,
//     });
//     console.log(`Created movie: ${movie.title}`);
//   }

//   console.log("Seeding completed!");
// };

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });