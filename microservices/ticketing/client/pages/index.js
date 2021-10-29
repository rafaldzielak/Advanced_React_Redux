import React from "react";

const LandingPage = ({ currentUser, tickets }) => {
  console.log(currentUser);
  console.log(tickets);

  const ticketList = tickets.map((ticket) => {
    return (
      <tr key={ticket.id}>
        <td>{ticket.title}</td>
        <td>{ticket.price}</td>
      </tr>
    );
  });

  return (
    <div>
      <h1>Tickets</h1>
      <table className='table'>
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{ticketList}</tbody>
      </table>
    </div>
  );
};

// specific to next.js - if we implement it - next.js will call this function while rendering the app on the server, any data returned from the function will be available as a prop
LandingPage.getInitialProps = async (context, client, currentUser) => {
  const { data: tickets } = await client.get("/api/tickets");
  return { tickets };
};

export default LandingPage;
