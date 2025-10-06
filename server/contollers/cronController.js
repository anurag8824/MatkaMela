// import cron from "node-cron";

// // Ye function call hoga app start hone par
// export const setupGameCronJobs = async (db) => {
//   try {
//     // Sabhi games fetch kar lo
//     const [games] = await db.query("SELECT * FROM games");

//     games.forEach((game) => {
//       const { ID, NAME, TIME1, TIME2 } = game;

//       // ---------- TIME1 (Play = checked) ----------
//       if (TIME1) {
//         const [hours, minutes, seconds] = TIME1.split(":");
//         const cronExp1 = `${seconds} ${minutes} ${hours} * * *`;

//         cron.schedule(cronExp1, async () => {
//           try {
//             await db.query("UPDATE games SET PLAY = 'checked' WHERE ID = ?", [ID]);
//             console.log(`[${NAME}] PLAY set to checked at ${TIME1}`);
//           } catch (err) {
//             console.error(`Error updating PLAY for game ${NAME} at TIME1:`, err);
//           }
//         });
//       }

//       // ---------- TIME2 (Play = unchecked) ----------
//       if (TIME2) {
//         const [hours, minutes, seconds] = TIME2.split(":");
//         const cronExp2 = `${seconds} ${minutes} ${hours} * * *`;

//         cron.schedule(cronExp2, async () => {
//           try {
//             await db.query("UPDATE games SET PLAY = 'unchecked' WHERE ID = ?", [ID]);
//             console.log(`[${NAME}] PLAY set to unchecked at ${TIME2}`);
//           } catch (err) {
//             console.error(`Error updating PLAY for game ${NAME} at TIME2:`, err);
//           }
//         });
//       }
//     });

//     console.log("✅ All game cronjobs scheduled successfully.");
//   } catch (err) {
//     console.error("Error setting up cronjobs:", err);
//   }
// };


import cron from "node-cron";

const gameCronJobs = new Map(); // 👈 gameID -> {time1Job, time2Job}

export const setupGameCronJobs = async (db) => {
  const [games] = await db.query("SELECT * FROM games");

  games.forEach((game) => {
    scheduleCronForGame(db, game);
  });

  console.log("✅ All game cronjobs scheduled.");
};

export const scheduleCronForGame = (db, game) => {
    // console.log(game,"gammme")
  const { ID, NAME, TIME1, TIME2 } = game;

  // Agar purane jobs hain toh unhe stop karo
  if (gameCronJobs.has(ID)) {
    const { time1Job, time2Job } = gameCronJobs.get(ID);
    if (time1Job) time1Job.stop();
    if (time2Job) time2Job.stop();
  }

  let time1Job = null;
  let time2Job = null;

  // TIME1 (checked)
  if (TIME1) {
    const [h, m, s] = TIME1.split(":");
    const exp = `${s} ${m} ${h} * * *`;

    time1Job = cron.schedule(exp, async () => {
    //   await db.query("UPDATE games SET PLAY = 'checked' WHERE ID = ?", [ID]);
      await db.query(
        "UPDATE games SET PLAY = 'checked', RESULT1 = '', RESULT2 = '' WHERE ID = ?",
        [ID]
      );
      console.log(`[${NAME}] PLAY -> checked at ${TIME1}`);
    });
  }

  // // TIME2 (unchecked)
  // if (TIME2) {
  //   const [h, m, s] = TIME2.split(":");
  //   const exp = `${s} ${m} ${h} * * *`;

  //   time2Job = cron.schedule(exp, async () => {
  //     await db.query("UPDATE games SET PLAY = 'unchecked' WHERE ID = ?", [ID]);
  //     console.log(`[${NAME}] PLAY -> unchecked at ${TIME2}`);
  //   });
  // }

   // ---- TIME2 ----
   if (TIME2) {
    const [h, m, s] = TIME2.split(":");

    let exp;

    // 🟢 Special case: DISAWAR (ID = 5)
    // TIME2 is *next day's morning* (e.g. 03:30 next day)
    if (ID === 5) {
      // Run at next day's same time — shift cron day by +1
      // node-cron format: second minute hour day-of-month month day-of-week
      // So we use "day-of-month + 1" logic using day-of-week.
      // But cron doesn’t support “+1 day” directly, so we handle it manually:
      // Schedule every day at 03:30, but only run if it's *next day of open time*.

      exp = `${s} ${m} ${h} * * *`; // still daily, but logic inside will check date

      time2Job = cron.schedule(exp, async () => {
        // Get current date/time
        const now = new Date();

        // Get current hour/minute and compare if it's after midnight but before TIME1
        // Example: at 03:30 AM on 7 Oct, TIME1 was 07:15 AM on 6 Oct (previous day)
        // So this means we should close DISAWAR now.

        // So, only mark unchecked if current time < TIME1 (means early morning)
        const [h1, m1] = TIME1.split(":").map(Number);
        if (now.getHours() < h1 || (now.getHours() === h1 && now.getMinutes() < m1)) {
          await db.query("UPDATE games SET PLAY = 'unchecked' WHERE ID = ?", [ID]);
          console.log(`[${NAME}] (Next Day Close) PLAY -> unchecked at ${TIME2}`);
        }
      });
    } else {
      // 🟡 Normal case (same-day close)
      exp = `${s} ${m} ${h} * * *`;

      time2Job = cron.schedule(exp, async () => {
        await db.query("UPDATE games SET PLAY = 'unchecked' WHERE ID = ?", [ID]);
        console.log(`[${NAME}] PLAY -> unchecked at ${TIME2}`);
      });
    }
  }

  // Save/update jobs
  gameCronJobs.set(ID, { time1Job, time2Job });
};
