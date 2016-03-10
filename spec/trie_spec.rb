require_relative '../trie'
require_relative '../node'
describe 'Trie' do
  let(:trie) {Trie.new}
  let(:empty_add) {trie.put("she")}
  let(:left_add) {trie.put("sells")}
  let(:right_add) {trie.put("the")}
  let(:full_trie) {empty_add; left_add; right_add; trie}
  let(:dict) {File.expand_path("..\\dictionaries\\dictionary-nursery.txt", File.dirname(__FILE__))}
  let(:dict_trie) {trie.load_dict(dict)}
  
  describe 'initialize' do
    it 'makes a Trie' do
      expect(trie).to be_a_kind_of(Trie)
    end
  end
  
  describe 'put' do
    it 'adds a word to an empty trie' do
      empty_add
      mid = [trie.root.value]
      mid << trie.root.middle.value
      mid << trie.root.middle.middle.value
      expect(mid).to eq(['s','h','e'])
    end

    it 'adds a word to left nodes' do
      empty_add
      left_add
      order = [trie.root.value]
      order << trie.root.middle.left.value
      order << trie.root.middle.left.middle.value
      expect(order.join).to eq('sel')
    end

    it 'adds a word to right nodes' do
      order = [full_trie.root.right.value]
      order << full_trie.root.right.middle.value
      order << full_trie.root.right.middle.middle.value
      expect(order.join).to eq('the')
    end
  end

  describe 'get' do
    it 'returns for single letter word' do
      ('A'..'Z').each {|letter| trie.put(letter)}
      test = ('A'..'Z').to_a.sample
      expect(trie.get(test).value).to eq test
    end
    it 'returns correct node for an existing word' do
      node = full_trie.get('she')
      expect(node).to be_a_kind_of(Node)
      expect(node.value).to eq "e"
    end
    it 'returns the node if sequence of letters exists, but not the word' do
      node = full_trie.get('sell')
      expect(node).to be_a_kind_of(Node)
      expect(node.value).to eq 'l'
      expect(full_trie.contains?('sell')).to eq false
    end
  end

  describe 'contains?' do
    it 'returns correct true/false' do
      expect(full_trie.contains?("she")).to eq true
      expect(full_trie.contains?("sells")).to eq true
      expect(full_trie.contains?("the")).to eq true
      expect(full_trie.contains?("devil")).to eq false
    end
  end

  describe 'sequence?' do
    it "returns true for sequences that aren't words" do
      expect(full_trie.contains?('sell')).to eq false
      expect(full_trie.sequence?('sell')).to eq true
      trie.load_dict(dict)
      expect(trie.sequence?('LINENDRAP')).to eq true
    end

    
  end

  describe 'load dict' do
    it 'correctly loads a dictionary' do
      trie.load_dict(dict)
      expect(trie.contains?('A')).to eq true
      expect(trie.contains?('WAG')).to eq true
      expect(trie.contains?('LIFTED')).to eq true
      expect(trie.contains?('PLAYFIL')).to eq false
      expect(trie.contains?('LINENDRAPER')).to eq true
    end
  end
end

describe 'node' do
  let(:node) {Node.new('a')}
  describe 'Initialize' do
    it 'makes a node' do
      expect(node).to be_a_kind_of(Node)
    end
    it 'makes three nil children' do
      expect(node.left).to eq nil
      expect(node.right).to eq nil
      expect(node.middle).to eq nil
    end
    it 'assigns a value' do
      expect(node.value).to eq 'a'
    end
  end
  describe 'comparator' do
    it 'compares two nodes by their values' do
      z = Node.new('z')
      expect(z <=> node).to eq 1
      expect(node <=> z).to eq -1
    end
    it 'can use other comparators' do
      z = Node.new('z')
      a = Node.new('a')
      expect(node < z).to eq true
    end
    it 'ignores case when comparing'do
      low = Node.new('z')
      up = Node.new("Z")
      expect(up==low).to be true
      expect(up > 'a').to be true
      expect(low > 'A').to be true
    end
  end
end