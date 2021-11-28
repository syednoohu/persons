import PersonListing from './components/PersonListing';
import PersonForm from './components/PersonForm';

import { ifopenPersonForm } from './features/formActionSlice'

import { useSelector } from 'react-redux'

import PageHeader  from './components/PageHeader';
import { Segment } from 'semantic-ui-react';
function App() {
  const ifFormToOpen = useSelector(ifopenPersonForm)
  return (
    <Segment>
      <PageHeader/>
      
      {ifFormToOpen ?  <PersonForm/> : null}  
      <PersonListing />
    </Segment>
  );
}

export default App;
