import { Provider } from "react-redux";
import store from "./app/store";
import Work from './containers/work/Work';

function App() {
  return (
    <Provider store={store}>
      <div>
        <Work></Work>
      </div>
    </Provider>
  );
}

export default App;
