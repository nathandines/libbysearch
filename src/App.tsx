import './App.scss';
import { Tabs, TabPanel } from './components/Tabs';
import Start  from './Start';
import BookSearch, { BookSearchProps } from './BookSearch';
import LibraryEditList from './LibraryEditList';
import LibrarySearch from './LibrarySearch';
import { useLibraryContext } from './context/LibraryContext';

function getBookSearchPropsFromURL(): BookSearchProps {
  const params = new URLSearchParams(window.location.search);
  return {
    initialQuery: params.get('q') || ''
  };
}

function App() {
  const {state} = useLibraryContext();

  const { initialQuery } = getBookSearchPropsFromURL();

  return (

    <div className="App">
      <header className="App-header">
        <h1>Libby Multi-Library Search</h1>
      </header>

      <main>
        <Tabs defaultTabIndex={state.libraries.length === 0 ? 0 : 1}>
          <TabPanel title="Start">
            <Start/>
          </TabPanel>
          <TabPanel title="Find Libraries">
            <LibrarySearch/>
          </TabPanel>
          <TabPanel title="My Libraries" counter={state.libraries.length}  disabled={state.libraries.length===0}>
            <LibraryEditList/>
          </TabPanel>
          <TabPanel title="Find Books"  disabled={state.libraries.length===0}>
            <BookSearch initialQuery={initialQuery} />
          </TabPanel>
        </Tabs>
      </main>

    </div>
  );
}

export default App;
