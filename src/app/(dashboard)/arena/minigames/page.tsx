"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RefreshCw } from "lucide-react"

export default function MiniGamesPage() {
  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Mini-Games Arcade</h2>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <TicTacToe />
          <SnakePlaceholder />
      </div>
    </div>
  )
}

function TicTacToe() {
    const [board, setBoard] = useState(Array(9).fill(null))
    const [isXNext, setIsXNext] = useState(true)
    const [winner, setWinner] = useState<string | null>(null)

    const checkWinner = (squares: any[]) => {
        const lines = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ]
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i]
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a]
            }
        }
        return null
    }

    const handleClick = (i: number) => {
        if (winner || board[i]) return
        const newBoard = [...board]
        newBoard[i] = isXNext ? 'X' : 'O'
        setBoard(newBoard)
        const w = checkWinner(newBoard)
        if (w) setWinner(w)
        else setIsXNext(!isXNext)
    }

    const reset = () => {
        setBoard(Array(9).fill(null))
        setWinner(null)
        setIsXNext(true)
    }

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Tic-Tac-Toe</CardTitle>
                <Button variant="ghost" size="icon" onClick={reset}><RefreshCw className="w-4 h-4"/></Button>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
                <div className="mb-4 text-lg font-bold">
                    {winner ? `Winner: ${winner} 🎉` : board.every(Boolean) ? "Draw!" : `Next Player: ${isXNext ? 'X' : 'O'}`}
                </div>
                <div className="grid grid-cols-3 gap-2">
                    {board.map((cell, i) => (
                        <button 
                            key={i} 
                            onClick={() => handleClick(i)}
                            className={`w-20 h-20 bg-secondary/20 rounded-lg text-4xl font-bold flex items-center justify-center transition-colors hover:bg-secondary/40 ${cell === 'X' ? 'text-blue-500' : 'text-red-500'}`}
                        >
                            {cell}
                        </button>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

function SnakePlaceholder() {
    return (
         <Card className="opacity-75">
            <CardHeader>
                <CardTitle>Snake (Coming Soon)</CardTitle>
            </CardHeader>
             <CardContent className="flex items-center justify-center h-[300px] bg-black/20 rounded-lg border-2 border-dashed">
                 <div className="text-center">
                     <div className="text-6xl mb-4">🐍</div>
                     <p>Multiplayer Snake Arena under construction</p>
                 </div>
             </CardContent>
         </Card>
    )
}
