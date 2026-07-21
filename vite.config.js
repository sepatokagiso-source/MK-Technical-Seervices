import { defineConfig } from 'vite'

export default defineConfig({
    server: {
        port: 5173,
        strictPort: true,
        middlewareMode: false,
        fs: {
            allow: ['..']
        }
    },
    build: {
        rollupOptions: {
            input: {
                main: './index.html',
                about: './pages/about.html',
                services: './pages/services.html',
                projects: './pages/projects.html',
                gallery: './pages/gallery.html',
                contact: './pages/contact.html',
                login: './pages/login.html',
                register: './pages/register.html',
                dashboard: './pages/dashboard.html',
                admin: './pages/admin.html',
                careers: './pages/careers.html',
                hvac: './pages/services/hvac.html',
                electrical: './pages/services/electrical.html',
                fireSafety: './pages/services/fire-safety.html',
                construction: './pages/services/construction.html'
            }
        }
    }
})
