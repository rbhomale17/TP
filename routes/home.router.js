// Define the root endpoint documentation
/**
 * @openapi
 * tags:
 *   name: Home
 *   description: API routes related to Flight
 */
app.get('/', (req, res) => {
    /**
     * @openapi
     * /:
     *   get:
     *     summary: Welcome message
     *     tags: [Home]
     *     responses:
     *       '200':
     *         description: Welcome message with author and documentation link
     *         content:
     *           application/json:
     *             example:
     *               msg: Welcome To Air Ticket Booking Backend
     *               name: Rushikesh Diliprao Bhomale
     *               student_code: fw25_348
     *               unit: RN101
     *               documentation_link: https://air-ticket-booking-server-fw25-348.onrender.com/documentation
     */
    res.send({
        msg: 'Welcome To Air Ticket Booking Backend',
        name: 'Rushikesh Diliprao Bhomale',
        student_code: 'fw25_348',
        unit: 'RN101',
        documentation_link: 'https://air-ticket-booking-server-fw25-348.onrender.com/documentation'
    });
});