var alltimeList, recentList;

class LeaderBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: ''
    }
  }

  componentDidMount() {
    const urlRecent = "https://fcctop100.herokuapp.com/api/fccusers/top/recent";
    const urlAlltime = "https://fcctop100.herokuapp.com/api/fccusers/top/alltime";

    $.get(urlRecent, function(users) {
      this.setState({
        users: users
      });
      recentList = users;
    }.bind(this));

    $.get(urlAlltime, function(users) {
      alltimeList = users;
    }.bind(this));
  }

  render() {
    if (!this.state.users) {
      return (
        <div className="loading">
          Loading...
      </div>
      );
    } else {
      return (
        <div className="table-wrapper">
           <table>
             <caption>FCC Leaderboard</caption>
             <tr>
               <th></th>
               <th>Profile Image</th>
               <th>Camper Name</th>
               <th><a className="sorting" onClick={this.sortByRecent.bind(this)}>Points in recent 30 days</a></th>
               <th><a className="sorting" onClick={this.sortByAlltime.bind(this)}>All time points</a></th>
             </tr>
      {this.state.users.map(user => {
               var userLink = `https://www.freecodecamp.com/${user.username}`;
       return (
             <tr>
               <td>{this.state.users.indexOf(user)+1}</td>
           <td><a href={userLink}><img src={user.img} alt="user image"/></a></td>
               <td><a href={userLink}>
                 <p className="username">{user.username}</p></a>
               </td>
               <td>{user.recent}</td>
               <td>{user.alltime}</td>
             </tr>
       );
      })}
          </table>
        </div>
      )
    }
  }

  sortByRecent() {
    this.setState({
      users: recentList
    });
  }
  sortByAlltime() {
    this.setState({
      users: alltimeList
    });
  }
}

ReactDOM.render(<LeaderBoard/>, document.querySelector('#leaderboard'))
