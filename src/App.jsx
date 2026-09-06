import AppRoutes from './routes/AppRoutes';

// App is the React component root - intentionally a thin wrapper.
// BrowserRouter lives in main.jsx so that tests can substitute MemoryRouter
// without touching App itself. Routing logic is kept in AppRoutes for
// separation of concerns.
function App() {
  return <AppRoutes />;
}

export default App;