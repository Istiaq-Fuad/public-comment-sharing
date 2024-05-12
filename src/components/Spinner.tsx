import { Oval } from "react-loader-spinner";

function Spinner() {
  return (
    <div>
      <Oval
        visible={true}
        height="80"
        width="80"
        color="#31363F"
        secondaryColor="#3D3B40"
        ariaLabel="oval-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
}

export default Spinner;
