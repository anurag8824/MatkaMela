export const insertAccountEntry = async (db, { mobile, paymode, point, closing, status }) => {
    const insertAccountSql = `
          INSERT INTO account (MOBILE, paymode, point, closing, DATE, status)
          VALUES (?, ?, ?, ?, ?, ?)
      `;
    const now = new Date(); // current time
    await db.query(insertAccountSql, [
        mobile,
        paymode,
        point,
        closing,
        now,
        status
    ]);
};
