import { AuthProvider } from './Contexts/Auth';
import { RouterProvider } from './Contexts/Router';
import './Style/app.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
  return (
    <div className='app'>
    <AuthProvider>
      <RouterProvider>
      </RouterProvider>
    </AuthProvider>
    </div>
  );
}


