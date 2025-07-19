import { SchemaBuilder } from './components/SchemaBuilder/SchemaBuilder';

function App() {
  return (
    <div className='flex flex-col items-center '>
      <p className='font-bold text-3xl m-4 p-4 '>JSON Schema Builder</p>
      <SchemaBuilder />
    </div>
  );
}

export default App;
