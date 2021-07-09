import React from 'react';
import './bootstrap.min.css';
class EmotionTable extends React.Component {
    render() {
        let emotion1 = this.props.emotions
        let emotion = Object.keys(emotion1)
        const mappingemotions = emotion.map(emo =>
            {
                return(
                    <>
                    <tr>
                    <td>{emo}</td>
                    <td>{emotion1[emo]}</td>
                    </tr>
                    </>
                )
            })
      return (  
        <div>

          <table className="table table-bordered">
            <tbody>
            {mappingemotions}
            </tbody>
          </table>
          </div>
          );
        }
}
export default EmotionTable;
