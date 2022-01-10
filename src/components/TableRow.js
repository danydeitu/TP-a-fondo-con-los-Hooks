import React from 'react'

function TableRow({title, length, rating, genres, awards}) {
    return (
        <tr>
            <th scope="row">{title}</th>
            <td>{length}</td>
            <td>{rating}</td>
            <td>
                <ul>
                    {
                        genres.map((genre, index) => <li key={index + genre}>{genre}</li>)
                    }
                </ul>
            </td>
            <td>{awards}</td>
        </tr>
    )
}

export default TableRow