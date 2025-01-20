// import { rest } from 'msw'

// export const handlers = [
//   rest.get('/api/user', (req, res, ctx) => {
//     return res(
//       ctx.status(200),
//       ctx.json({
//         id: 1,
//         name: 'John Doe',
//       }),
//     )
//   }),

//   // POST 요청을 가로채기
//   rest.post('/api/login', (req, res, ctx) => {
//     const { username } = req.body
//     return res(
//       ctx.status(200),
//       ctx.json({
//         message: `Welcome, ${username}!`,
//       }),
//     )
//   }),
// ]
