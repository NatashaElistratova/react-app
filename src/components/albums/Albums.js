import React from 'react'

export default function Albums(props) {
  function openPopup(e, albumId) {
    props.openPopup(e, albumId);
  }
  return <div>
            <table className="uk-table uk-table-justify uk-table-divider">
              <tbody>
              {props.albums.map((album) => {
                return (<tr key={album.id}>
                  <td><span uk-icon="icon: album; ratio: 2"/></td>
                  <td>{album.title}</td>
                  <td><button className="uk-button uk-button-primary js-lightbox" style={{whiteSpace: 'nowrap'}}
                         onClick={(e) => {openPopup(e, album.id)}}>Open
                    album</button></td>
                </tr>)
                })
              }
              </tbody>
            </table>
          </div>
}