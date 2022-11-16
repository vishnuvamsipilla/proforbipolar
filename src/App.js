import "./App.css";
import { useState, useEffect } from "react";
import { ThreeDots } from "react-loader-spinner";
import { UserProfile } from "./components/UserProfile";

function App() {
  const [isLoading, toggleApiStatus] = useState(true);
  const [usersDetails, updateUserDetails] = useState([]);

  const deleteUser = (id) => {
    updateUserDetails(usersDetails.filter((user) => user.id !== id));
  };

  const editUserDetails = (id, obje) => {
    console.log(usersDetails);
    const l = usersDetails.map((eachItem) => {
      if (eachItem.id === id) {
        return {
          ...eachItem,
          name: obje.name,
          email: obje.email,
          phone: obje.phone,
          website: obje.website,
        };
      } else {
        return eachItem;
      }
    });

    updateUserDetails(l);
  };

  const getUserDetails = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await response.json();
    updateUserDetails(data);
    toggleApiStatus(false);
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  const renderLoadingView = () => (
    <ThreeDots
      height="80"
      width="80"
      radius="9"
      color="#4fa94d"
      ariaLabel="three-dots-loading"
      wrapperStyle={{}}
      wrapperClassName=""
      visible={true}
    />
  );

  const renderAppView = () => {
    return (
      <ul className="users-view">
        {usersDetails.map((user) => (
          <UserProfile
            details={user}
            key={user.id}
            deleteUser={deleteUser}
            editUserDetails={editUserDetails}
          />
        ))}
      </ul>
    );
  };

  return (
    <div className="App">
      {isLoading ? renderLoadingView() : renderAppView()}
    </div>
  );
}

export default App;
