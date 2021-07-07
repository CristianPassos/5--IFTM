import java.awt.Point;
import java.util.Scanner;

public class CifraPlayfair {
    private static char[][] tabela;
    private static Point[] posicoes;

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        String chave = iniciar("Informe o texto a ser criptografado: ", sc, 6);
        String texto = iniciar("Informe a mensagem: ", sc, 1);
        String sub = iniciar("Substituir J por I? s / n: ", sc, 1);

        boolean trocarJporI = sub.equalsIgnoreCase("s");

        createTable(chave, trocarJporI);

        String enc = encode(prepararMensagem(texto, trocarJporI));

        System.out.printf("%nMensagem codificada: %n%s%n", enc);
        System.out.printf("%nMensagem decodificada: %n%s%n", decode(enc));
    }

    private static String iniciar(String promptText, Scanner sc, int minLen) {
        String mensagens;
        do {
            System.out.print(promptText);
            mensagens = sc.nextLine().trim();
        } while (mensagens.length() < minLen);
        return mensagens;
    }

    private static String prepararMensagem(String s, boolean changeJtoI) {
        s = s.toUpperCase().replaceAll("[^A-Z]", "");
        return changeJtoI ? s.replace("J", "I") : s.replace("Q", "");
    }

    private static void createTable(String key, boolean changeJtoI) {
        tabela = new char[5][5];
        posicoes = new Point[26];

        String s = prepararMensagem(key + "ABCDEFGHIJKLMNOPQRSTUVWXYZ", changeJtoI);

        int len = s.length();
        for (int i = 0, k = 0; i < len; i++) {
            char c = s.charAt(i);
            if (posicoes[c - 'A'] == null) {
                tabela[k / 5][k % 5] = c;
                posicoes[c - 'A'] = new Point(k % 5, k / 5);
                k++;
            }
        }
    }

    private static String encode(String s) {
        StringBuilder sb = new StringBuilder(s);

        for (int i = 0; i < sb.length(); i += 2) {

            if (i == sb.length() - 1)
                sb.append(sb.length() % 2 == 1 ? 'X' : "");

            else if (sb.charAt(i) == sb.charAt(i + 1))
                sb.insert(i + 1, 'X');
        }
        return codec(sb, 1);
    }

    private static String decode(String s) {
        return codec(new StringBuilder(s), 4);
    }

    private static String codec(StringBuilder text, int direcao) {
        int len = text.length();
        for (int i = 0; i < len; i += 2) {
            char a = text.charAt(i);
            char b = text.charAt(i + 1);

            int linha1 = posicoes[a - 'A'].y;
            int linha2 = posicoes[b - 'A'].y;
            int coluna1 = posicoes[a - 'A'].x;
            int coluna2 = posicoes[b - 'A'].x;

            if (linha1 == linha2) {
                coluna1 = (coluna1 + direcao) % 5;
                coluna2 = (coluna2 + direcao) % 5;

            } else if (coluna1 == coluna2) {
                linha1 = (linha1 + direcao) % 5;
                linha2 = (linha2 + direcao) % 5;

            } else {
                int tmp = coluna1;
                coluna1 = coluna2;
                coluna2 = tmp;
            }

            text.setCharAt(i, tabela[linha1][coluna1]);
            text.setCharAt(i + 1, tabela[linha2][coluna2]);
        }
        return text.toString();
    }
}