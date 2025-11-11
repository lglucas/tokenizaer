// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/TokenFactory.sol";
import "../src/SimpleToken.sol";

contract TokenFactoryTest is Test {
    TokenFactory public factory;
    address public creator = address(0x1234);
    address public other = address(0x5678);

    function setUp() public {
        factory = new TokenFactory();
    }

    function test_FactoryDeployment() public {
        assertNotEq(factory.tokenImplementation(), address(0));
    }

    function test_CreateTokenSimple() public {
        vm.prank(creator);
        address tokenAddr = factory.createTokenSimple(
            "Meme Coin",
            "MEME",
            1000000,
            18,
            "ipfs://meme"
        );

        assertNotEq(tokenAddr, address(0));
        assertEq(factory.tokenCreator(tokenAddr), creator);

        SimpleToken token = SimpleToken(tokenAddr);
        assertEq(token.name(), "Meme Coin");
        assertEq(token.symbol(), "MEME");
        assertEq(token.totalSupply(), 1000000 * 10 ** 18);
    }

    function test_CreateMultipleTokens() public {
        vm.prank(creator);
        address token1 = factory.createTokenSimple(
            "Token 1",
            "T1",
            1000,
            18,
            "ipfs://t1"
        );

        vm.prank(creator);
        address token2 = factory.createTokenSimple(
            "Token 2",
            "T2",
            2000,
            18,
            "ipfs://t2"
        );

        vm.prank(other);
        address token3 = factory.createTokenSimple(
            "Token 3",
            "T3",
            3000,
            18,
            "ipfs://t3"
        );

        assertEq(factory.getTotalTokens(), 3);
    }

    function test_GetDeployedTokens() public {
        vm.prank(creator);
        address token1 = factory.createTokenSimple(
            "Token 1",
            "T1",
            1000,
            18,
            "ipfs://t1"
        );

        vm.prank(creator);
        address token2 = factory.createTokenSimple(
            "Token 2",
            "T2",
            2000,
            18,
            "ipfs://t2"
        );

        address[] memory tokens = factory.getDeployedTokens();
        assertEq(tokens.length, 2);
        assertEq(tokens[0], token1);
        assertEq(tokens[1], token2);
    }

    function test_GetTokensByCreator() public {
        vm.prank(creator);
        factory.createTokenSimple("Token 1", "T1", 1000, 18, "ipfs://t1");

        vm.prank(creator);
        factory.createTokenSimple("Token 2", "T2", 2000, 18, "ipfs://t2");

        vm.prank(other);
        factory.createTokenSimple("Token 3", "T3", 3000, 18, "ipfs://t3");

        address[] memory creatorTokens = factory.getTokensByCreator(creator);
        assertEq(creatorTokens.length, 2);

        address[] memory otherTokens = factory.getTokensByCreator(other);
        assertEq(otherTokens.length, 1);
    }

    function test_GetTokenInfo() public {
        vm.prank(creator);
        address tokenAddr = factory.createTokenSimple(
            "Test Token",
            "TEST",
            1000,
            18,
            "ipfs://test"
        );

        (address creatorAddr, uint256 createdAt, string memory metadataURI) = factory
            .getTokenInfo(tokenAddr);

        assertEq(creatorAddr, creator);
        assertGt(createdAt, 0);
        assertEq(
            keccak256(abi.encodePacked(metadataURI)),
            keccak256(abi.encodePacked("ipfs://test"))
        );
    }

    function test_GetTokensPaginated() public {
        // Criar 10 tokens
        for (uint256 i = 0; i < 10; i++) {
            vm.prank(creator);
            factory.createTokenSimple(
                "Token",
                "T",
                1000,
                18,
                "ipfs://test"
            );
        }

        // Get primeira página (5 tokens)
        (address[] memory page1, uint256 total1) = factory.getTokensPaginated(
            0,
            5
        );
        assertEq(page1.length, 5);
        assertEq(total1, 10);

        // Get segunda página (5 tokens)
        (address[] memory page2, uint256 total2) = factory.getTokensPaginated(
            5,
            5
        );
        assertEq(page2.length, 5);
        assertEq(total2, 10);

        // Garantir que páginas são diferentes
        assertNotEq(page1[0], page2[0]);
    }

    function test_InvalidInputs() public {
        vm.prank(creator);
        vm.expectRevert("Name cannot be empty");
        factory.createTokenSimple("", "T", 1000, 18, "ipfs://test");

        vm.prank(creator);
        vm.expectRevert("Symbol cannot be empty");
        factory.createTokenSimple("Token", "", 1000, 18, "ipfs://test");

        vm.prank(creator);
        vm.expectRevert("Supply must be > 0");
        factory.createTokenSimple("Token", "T", 0, 18, "ipfs://test");

        vm.prank(creator);
        vm.expectRevert("Decimals must be <= 18");
        factory.createTokenSimple("Token", "T", 1000, 19, "ipfs://test");
    }

    function test_DifferentDecimals() public {
        vm.prank(creator);
        address token6 = factory.createTokenSimple(
            "USDC",
            "USDC",
            1000000,
            6,
            "ipfs://usdc"
        );

        SimpleToken t = SimpleToken(token6);
        assertEq(t.decimals(), 6);
        assertEq(t.totalSupply(), 1000000 * 10 ** 6);
    }
}
