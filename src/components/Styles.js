export const statusColors = {
  _GOOD: '#1DD1A1',
  _OFFLINE: '#707070',
  _WARNING: '#FF9F43',
  _EMERGENCY: '#EE5253',
}

let borderSize = '5px'
let borderType = 'solid'
let textColor = 'white'

export const printerStyles = {

  _OFFLINE: {

    titlebar: {
      color: textColor,
      background: statusColors._OFFLINE
    },

    status_summary: {
      border: `${borderSize} ${borderType} ${statusColors._OFFLINE}`
    }

  },

  _GOOD: {

    titlebar: {
      color: textColor,
      background: statusColors._GOOD
    },

    status_summary: {
      border:  `${borderSize} ${borderType} ${statusColors._GOOD}`
    }
  },

  _WARNING: {

    titlebar: {
      color: textColor,
      background: statusColors._WARNING
    },

    status_summary: {
      border: `${borderSize} ${borderType} ${statusColors._WARNING}`
    }

  },

  _EMERGENCY: {

    titlebar: {
      color: textColor,
      background: statusColors._EMERGENCY
    },  
    status_summary: {
      border: `${borderSize} ${borderType} ${statusColors._EMERGENCY}`
    }

  }
  

}

export const trayStyles = {
  _FULL: {
    color: '#1DD1A1',
    background: '#E4FEF7'
  },

  _LOW: {
    color: '#FF9F43',
    background: '#FFECDA'
  },

  _EMPTY: {
    color: '#EE5253',
    background: '#FFE6E6'
  },

  _MISSING: {
    color: '#FFFFFF',
    background: '#707070'
  }
}

