export interface PositionStyle {
  bg: string
  textColor: string
}

export const positionStyles: Record<
  'Frontend' | 'Backend' | 'DevOps' | 'FullStack' | 'DataEngineer' | 'Leader',
  PositionStyle
> = {
  Frontend: {
    bg: 'lightblue',
    textColor: 'text-blue',
  },
  Backend: {
    bg: 'lightgreen',
    textColor: 'text-green',
  },
  DevOps: {
    bg: 'lightpink',
    textColor: 'text-pink',
  },
  FullStack: {
    bg: 'lightyellow',
    textColor: 'text-yellow',
  },
  DataEngineer: {
    bg: 'lightpurple',
    textColor: 'text-purple',
  },
  Leader: {
    bg: 'lightprimary',
    textColor: 'text-pink',
  },
}

export function mapRoleToStyleKey(role: string) {
  if (role in positionStyles) {
    return role
  }

  switch (role) {
    case 'FRONTEND':
      return 'Frontend'
    case 'BACKEND':
      return 'Backend'
    case 'DEVOPS':
      return 'DevOps'
    case 'FULL_STACK':
      return 'FullStack'
    case 'DATA_ENGINEER':
      return 'DataEngineer'
    default:
      return 'UNKNOWN'
  }
}

export function getPositionStyle(role: string): PositionStyle {
  const position = mapRoleToStyleKey(role)
  if (position in positionStyles) {
    return positionStyles[position as keyof typeof positionStyles]
  }
  // 알 수 없는 포지션이면 기본색상
  return { bg: 'lightgray', textColor: 'text-black' }
}
