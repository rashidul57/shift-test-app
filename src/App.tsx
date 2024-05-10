import ErrorPageContent from './components/ErrorPage';
import FavouritePageContent from './components/FavouritePage';
import SearchPageContent from './components/SearchPage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DataProvider from './context/data-provider';

function App() {
  return (
    <BrowserRouter>
      <DataProvider>
        <Routes>
            <Route index element={<SearchPageContent />} />
            <Route path="/search" element={<SearchPageContent />} />
            <Route path="/favourites" element={<FavouritePageContent />} />
            <Route path="*" element={<ErrorPageContent />} />
        </Routes>
      </DataProvider>
    </BrowserRouter>
  );
}

export default App;
