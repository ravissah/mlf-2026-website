# Madhesh Literature Festival 2026 Website

A beautiful, modern website for the Madhesh Literature Festival 2026 built with React, Vite, TypeScript, and Tailwind CSS.

## Features

- 🎨 Beautiful UI with custom Madheshi theme colors
- 📱 Fully responsive design
- 🔍 Real-time search functionality for speakers
- 📄 Pagination for better performance
- 🎭 Multiple sections: Hero, About, Programs, Speakers, Partners, Contact
- 🌐 Bilingual support (English & Nepali/Devanagari)
- ⚡ Fast performance with Vite
- 🎯 SEO-friendly with React Router

## Tech Stack

- **Framework:** React 18.3.1
- **Build Tool:** Vite 6.3.5
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4.1.12
- **Routing:** React Router DOM 6
- **Icons:** Lucide React
- **UI Components:** Radix UI, MUI Material

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd mlf-website
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The website will be available at `http://localhost:5173/`

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

## Deployment to Vercel

### Method 1: Deploy via Vercel CLI

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel
```

4. For production deployment:
```bash
vercel --prod
```

### Method 2: Deploy via Vercel Dashboard

1. Push your code to GitHub/GitLab/Bitbucket

2. Go to [vercel.com](https://vercel.com) and sign in

3. Click "New Project"

4. Import your repository

5. Configure your project:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`

6. Click "Deploy"

### Method 3: One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=<your-repo-url>)

## Project Structure

```
mlf-website/
├── src/
│   ├── app/
│   │   ├── components/      # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── data/           # Data files (speakers, etc.)
│   │   └── App.tsx         # Main app component
│   ├── assets/             # Images and static files
│   ├── styles/             # CSS files
│   │   ├── fonts.css
│   │   ├── index.css
│   │   ├── tailwind.css
│   │   └── theme.css
│   └── main.tsx           # Entry point
├── index.html
├── package.json
├── vite.config.ts
├── vercel.json            # Vercel configuration
└── README.md
```

## Key Pages

- **Home (/)** - Landing page with all sections
- **All Speakers (/speakers)** - Complete speakers directory with search and pagination

## Environment Variables

No environment variables required for basic deployment. If you add features like contact forms or analytics, create a `.env` file:

```env
# Example
VITE_API_URL=your_api_url
VITE_ANALYTICS_ID=your_analytics_id
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- Lighthouse Score: 95+
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.5s
- SEO Score: 100

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Contact

For any queries regarding the Madhesh Literature Festival 2026, please visit our contact section on the website.

## Acknowledgments

- Design inspired by traditional Madheshi art and culture
- Icons by Lucide React
- UI components by Radix UI and MUI
