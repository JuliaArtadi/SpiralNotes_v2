const { db } = require("@vercel/postgres");
const notes = require("./placeholder-data.js");

async function seedNotes(client) {
  try {

    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "notes" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS notes (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      user_id UUID NOT NULL,
      title VARCHAR(255) NOT NULL,
      content VARCHAR(255) NOT NULL,
      date DATE NOT NULL,
      phase_index INT NOT NULL
    );
  `;

    console.log(`Created "notes" table`);
    console.log(notes);

    // Insert data into the "notes" table
    const insertedNotes = await Promise.all(

      notes.map(
        (note) => client.sql`
          INSERT INTO notes (user_id, title, content, date, phase_index)
          VALUES (${note.user_id}, ${note.title}, ${note.content}, ${note.date}, ${note.phase_index})
          ON CONFLICT (id) DO NOTHING;
        `
      )
    );

    console.log(`Seeded ${insertedNotes.length} notes`);

    return {
      createTable,
      notes: insertedNotes,
    };
  } catch (error) {
    console.error("Error seeding notes:", error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  await seedNotes(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    "An error occurred while attempting to seed the database:",
    err
  );
});
