require_relative 'node'

class Trie
  attr_reader :root
  def initialize(words=nil)
    return if words.nil?
    words.each { |word| put(word) } if words.kind_of? Array
    load_dict(words) if File.exist? words
  end

  # adds a word to the trie
  def put(word)
    @root = add(@root, word, 0)
  end

  # Returns the node if the sequence is in the trie
  # this returns the node even if it is not a valid
  # word so that the user can find sub-sequences
  def get(word)
    node = cache if cache_hit? word
    node ||= @root
    node = find(node, word, 0)
  end

  # Checks if the trie contains a word by finding the
  # sequence of characters and checking if the final
  # node is the end of a wod
  def contains?(word)
    node = get(word)
    return false if node.nil?
    node.word_end
  end

  # Checks if the trie contains the sequence
  # does not care whether or not that sequence
  # is a valid word
  def sequence?(sequence)
    node = get(sequence)
    !node.nil?
  end

  # Loads dictionary into Trie
  def load_dict(filename)
    lines = File.readlines(filename)
    lines.shuffle.each do |line|
      word = line.chomp
      put(word)
    end
  end

  private
  def add(node, word, char_loc)
    char = word[char_loc]
    node = Node.new(char) if node.nil?
    if node > char
      node.left = add(node.left, word, char_loc)
    elsif node < char
      node.right = add(node.right, word, char_loc)
    elsif char_loc < word.length - 1  
      node.middle = add(node.middle, word, char_loc + 1)
    else
      node.mark_end
    end    
    node
  end

  # A helper method which Finds the node
  # at the end of the given word,
  # (or sequence of characters), returns node
  def find(node, word, char_loc)
    return nil if node.nil?
    return cache(word, node) if char_loc == word.length
    char = word[char_loc]
    if char < node
      return find(node.left, word, char_loc)
    elsif char > node
      return find(node.right, word, char_loc)
    elsif char_loc < word.length - 1
      return find(node.middle, word, char_loc + 1)
    else
      node
    end        
  end

  def cache(sequence=nil, node=nil)
    return @cache_node unless sequence
    @cache_seq = sequence
    @cache_node = node
  end

  # a cache hit can occur if the given sequence
  # contains the stored sequence
  # returns node if there is a cache hit
  # returns nil if there is not a cache hit
  def cache_hit?(sequence)
    return @cache_node if @cache_node == sequence[-1] && sequence.include?(@cache_seq)
    nil
  end
end