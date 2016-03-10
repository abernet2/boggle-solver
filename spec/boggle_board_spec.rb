require_relative '../boggle_board'

describe "Boggle Board" do

  let(:board) { BoggleBoard.new }

  describe 'Shake method' do
    it "can be shaken" do
      expect{board.shake!}.not_to raise_error
    end

    it "can be shaken multiple times" do
      3.times { board.shake! }
      expect{board.shake!}.not_to raise_error
    end

    it 'has a different state after shake is called' do
      first_string = board.to_s
      board.shake!
      second_string = board.to_s
      expect(first_string).not_to eq second_string
    end
  end
  
  describe "To_String method" do
    it 'has a printable representation of 4 underscores in each of 4 rows on separate lines BEFORE it is shaken' do
      expect(board.to_s).to match(/^_{4}${4}/)
    end

    it 'has a printable representation of 4 letters in each of 4 rows on separate lines AFTER it is shaken' do
      board.shake!
      expect(board.to_s).to match(/^[A-Z]{4}${4}/)
    end

    it 'has the same state every time to_s is called' do
      first_string = board.to_s
      second_string = board.to_s
      expect(first_string).to eq second_string
    end
  end

  describe 'Helper methods' do
    it 'get_neighbors method returns correct values' do
      expect(board.get_neighbor_indices(0,0).sort).to eq([[0,1],[1,0],[1,1]])
    end

    it 'valid_coords returns false on negative values' do
      expect(board.valid_coord?(-1,-1)).to eq false
    end

    it 'valid_coords returns false on extra large values' do
      expect(board.valid_coord?(4, 4)).to eq false
    end

    it "part_of_word? returns fales if current cell has been visited" do
      expect(board.part_of_word?("word",0,0,[[0,0]])).to eq false
    end
  end

  describe "Boggle Board - Correct Answers" do
    let(:board) { BoggleBoard.new }
    let(:cycle) { BoggleBoard.new([['A','N','T','B'],['R','N','D','I'],['E','C','N','U'],['N','K','H','D']]) }


    it 'returns valid word for a horizontal sequence of letters' do 
      seq = board.board[0][0..3].join
      expect(board.include?(seq)).to eq true
    end
    it 'returns valid word for a horizontal sequence of letters' do 
      seq = board.board[0..3][0].join
      expect(board.include?(seq)).to eq true
    end
    it 'returns valid word for a diagonal sequence of letters' do
      seq = ""
      board.board.each_with_index do |row, rindex|
        row.each_with_index do |col, cindex|
          seq += col if rindex == cindex
        end
      end
      expect(board.include?(seq)).to eq true
    end

    it 'handles a cycle' do
      cycle = BoggleBoard.new([['A','N','T','B'],['R','N','D','I'],['E','C','N','U'],['N','K','H','D']])
      seq = 'anna'.upcase
      expect(cycle.include?(seq)).to eq false
    end

    it 'handles the qu exception' do
      qu = BoggleBoard.new([['Qu','I','T','B'],['R','N','D','I'],['E','C','N','U'],['N','K','H','D']])
      expect(qu.include?("QUIT")).to eq true
    end

    it 'handles lower case words' do
      seq = board.board[0][0..3].join.downcase
      expect(board.include?(seq)).to eq true
    end

  end

  describe "BoggleBoard Brackets" do
    it 'can access board row with single bracket' do
      expect(board[0]).to be_a_kind_of(Array)
      expect(board[0].length).to eq 4
    end
    it 'can access board cell with double bracket' do
      expect(board[0][0]).to be_a_kind_of(String)
    end
  end
end