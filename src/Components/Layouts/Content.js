import React from 'react'
import { Start, PlayerPage, Debuginformations, RoundPage, Supervisor, PlayPage, Tests, Modelviewer } from '../Contents'

//TIP: Array is used to compose menu, menuselection by index. If menu is enlarged, adapt also file ..Contents/index.js!!!
//TODO: Case selecter with many if's can be optimized, but not jet.
export const content = [
  {
    jsid: "Start",
    text: "Start",
    view: 1
  },
  {
    jsid: "PlayerPage",
    text: "Spiel Tisch",
    view: 1
  },
  {
    jsid: "RoundPage",
    text: "Runde",
    view: 1
  },
  {
    jsid: "PlayPage",
    text: "Spiel",
    view: 1
  }, 
  {
    jsid: "Supervisor",
    text: "Supervisor",
    view: 2
  },  
  {
    jsid: "Tests",
    text: "Tests",
    view: 10
  },
  {
    jsid: "Debuginformations",
    text: "Debug",
    view: 10
  },  
  {
    jsid: "Modelviewer",
    text: "Model View",
    view: 10
  },
]


export default ({
  index,
  changePage
}) => {

  if (content[index].jsid === 'Debuginformations') return <Debuginformations />
  if (content[index].jsid === 'Start') return <Start changePage={changePage}/>
  if (content[index].jsid === 'RoundPage') return <RoundPage changePage={changePage}/>
  if (content[index].jsid === 'PlayerPage') return <PlayerPage changePage={changePage}/>
  if (content[index].jsid === 'Supervisor') return <Supervisor />
  if (content[index].jsid === 'PlayPage') return <PlayPage changePage={changePage}/>
  if (content[index].jsid === 'Tests') return <Tests />
  if (content[index].jsid === 'Modelviewer') return <Modelviewer />

  return <div>Page not Found for Content: jsid -&grt; {content[index].jsid} : index->{index}</div>

}
