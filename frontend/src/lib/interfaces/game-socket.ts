




export interface IGameSocket {
  joinGame(gameId: string): Promise<{playerId: string, username: string}>
}
