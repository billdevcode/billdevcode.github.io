const urlRecent = "https://fcctop100.herokuapp.com/api/fccusers/top/recent";
const urlAlltime = "https://fcctop100.herokuapp.com/api/fccusers/top/alltime";
var alltimeArray = [],
    recentArray = [];

const API = React.createClass({
  getInitialState() {
    return {
      users: ''
    }
  },

  componentDidMount() {
    $.ajax({
      url: urlRecent,
      cache: false,
      dataType: "json",
      success: function(users) {
        this.setState({
          users: users
        });
        recentArray = users;
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });

    $.ajax({
      url: urlAlltime,
      cache: false,
      dataType: "json",
      success: function(users) {
        alltimeArray = users;
      },
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  render() {
    if (!this.state.users) {
      return (
        <div>
        Loading...
      </div>
      )
    } else {
      return (
        <div className="board">
           <table>
             <caption>Leaderboard</caption>
           <tr>
             <th>#</th>
             <th>Camper Name</th>
             <th><a className="sortable" onClick={this.sortByRecent.bind(this)}>Points in recent 30 days</a></th>
             <th><a className="sortable" onClick={this.sortByAlltime.bind(this)}>All time points</a></th>
           </tr>
      {this.state.users.map(user => {
               var userLink = `https://www.freecodecamp.com/${user.username}`;
       return (
         <tr>
           <td>{this.state.users.indexOf(user)+1}</td>
           <td><a href={userLink}>
             <p className="username"><img src={user.img} alt="user image"/><br/>{user.username}</p></a>
            </td>
           <td>{user.recent}</td>
           <td>{user.alltime}</td>
         </tr>

       )
      })}
              </table>
        </div>
      )
    }
  },

  sortByRecent() {
    this.setState({
      users: recentArray
    });
  },
  sortByAlltime() {
    this.setState({
      users: alltimeArray
    });
  },

})

const mountNode = document.querySelector('#leaderboard');

ReactDOM.render(<API/>, mountNode)
