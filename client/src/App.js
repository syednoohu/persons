import PersonListing from './components/PersonListing';
import PersonForm from './components/PersonForm';

import PageHeader  from './components/PageHeader';
import { Segment } from 'semantic-ui-react';
function App() {
  return (
    <Segment>
      <PageHeader/>
      <PersonForm/>
      <PersonListing />
    </Segment>
  );
}

export default App;
