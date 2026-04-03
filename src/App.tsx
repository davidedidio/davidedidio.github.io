import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Layout from './components/Layout';
import Blog from './pages/Blog';
import About from './pages/About';
import Tools from './pages/Tools';
import ToolPlaceholder from './tools/tool1/ToolPlaceholder';
import './styles/global.css';
import {SidebarProvider} from "./context/SidebarContext.tsx";
import Redirect from "./components/Redirect.tsx";

export default function App() {
    return (
        <SidebarProvider>
            <BrowserRouter>
                <Routes>
                    <Route element={<Layout/>}>
                        <Route index element={<Blog/>}/>
                        <Route path="about" element={<About/>}/>
                        <Route path="tools" element={<Tools/>}/>
                        <Route path="tools/tool-one" element={<ToolPlaceholder/>}/>
                        <Route path="tools/tool-two"
                               element={<Redirect prop='https://davidedidio.github.io/serpentaire_compagnon/'/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </SidebarProvider>
    );
}