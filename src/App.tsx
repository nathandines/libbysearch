import './App.scss';
import { useEffect, useState } from 'react';
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

  const getInitialTab = () => {
    if (state.libraries.length === 0) return 0;
    return 1;
  };

  const [tabIndex, setTabIndex] = useState(getInitialTab());
  const [autoSwitched, setAutoSwitched] = useState(false);

  useEffect(() => {
    if (!autoSwitched && initialQuery !== "" && state.libraries.length > 0) {
      setTabIndex(3);
      setAutoSwitched(true);
    }
  }, [state.libraries, initialQuery, autoSwitched]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Libby Multi-Library Search</h1>
      </header>

      <main>
        <Tabs tabIndex={tabIndex} setTabIndex={setTabIndex}>
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
