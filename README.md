# next-shopper

> [!NOTE]
>
> `TODO:` `README` will be updated according to the new features and structure.
> In the mean time, following commands can be used to run the project locally.
> Prerequisites: Node.js, pnpm, Docker
> Create a `.env.local` file, copy contents of `.env.local` into it and set empty values.
>
> ```bash
> # Install dependencies
> pnpm install
> # Start db
> pnpm db:start
> # Migrate db
> pnpm db:migrate
> # Seed db
> pnpm db:seed
> # Run app in development mode
> pnpm dev
> # When you are done, stop db
> pnpm db:stop
> ```

This is an e-commerce web application built with [Next.js](https://nextjs.org/), using App Router, React Server Components and Server Actions.

The data is derived from the [Fake Store API](https://fakestoreapi.com/). It is a really cool API to build e-commerce demo projects. Due to requirement to add some extra fields and features, its data is copied and changed a little.

**Live demo is [here](https://next-shopper.vercel.app/).**

## 💻 Tech Stack

- Language: [TypeScript](https://www.typescriptlang.org/)
- Framework: [Next.js](https://nextjs.org/)
- Database: [PostgreSQL](https://www.postgresql.org/)
- ORM: [Prisma](https://www.prisma.io/)
- Components: [Radix Primitives](https://www.radix-ui.com/primitives)
- Styling: [Tailwind CSS](https://tailwindcss.com/)
- Animations: [Framer Motion](https://www.framer.com/motion/)
- Icons: [React Icons](https://react-icons.github.io/react-icons/)
- Linting: [ESLint](https://eslint.org/)
- Code Formatting: [Prettier](https://prettier.io/)
- Deployment: [Vercel](https://vercel.com/)

## ⌨️ Development

To start development, we should install our packages first.

```bash
pnpm install
```

After the installation is completed, we can run the app by:

```bash
pnpm dev
```

and it will start on `http://localhost:3000`.

## 🚀 Build

To create a production build, we need to run the below command first:

```bash
pnpm build
```

After this step, we can run the app in `production` mode by:

```bash
pnpm start
```
